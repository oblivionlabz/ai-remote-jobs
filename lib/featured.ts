export interface FeaturedJobEntry {
  id: string;
  company: string;
  title: string;
  plan: string;
  email: string;
  url: string;
  paid_at: string;
  featured: boolean;
  location?: string;
  type?: string;
  tags?: string[];
  posted_at?: string;
  source?: string;
}

const REPO = "oblivionlabz/ai-remote-jobs";
const FILE_PATH = "data/featured_jobs.json";
const DEFAULT_BRANCH = "main";

export async function getFeaturedJobs(): Promise<FeaturedJobEntry[]> {
  try {
    const rawUrl = `https://raw.githubusercontent.com/${REPO}/${DEFAULT_BRANCH}/${FILE_PATH}`;
    const res = await fetch(rawUrl, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.error("getFeaturedJobs error:", e);
    return [];
  }
}

export async function addFeaturedJob(job: FeaturedJobEntry): Promise<boolean> {
  const GH = process.env.GITHUB_TOKEN;
  if (!GH) {
    console.error("GITHUB_TOKEN not configured");
    return false;
  }
  try {
    // Get current file SHA (required for updates)
    const shaRes = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`,
      { headers: { Authorization: `Bearer ${GH}`, Accept: "application/vnd.github+json" }, cache: "no-store" }
    );
    const current = await getFeaturedJobs();
    current.unshift(job); // newest first
    const encoded = Buffer.from(JSON.stringify(current, null, 2)).toString("base64");
    const body: Record<string, unknown> = {
      message: `feat: add featured job ${job.company}`,
      content: encoded,
    };
    if (shaRes.ok) {
      const shaData = await shaRes.json();
      body.sha = shaData.sha;
    }
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GH}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    if (!res.ok) console.error(`GitHub PUT failed: ${res.status}`);
    return res.ok;
  } catch (e) {
    console.error("addFeaturedJob error:", e);
    return false;
  }
}
