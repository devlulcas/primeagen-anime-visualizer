type GithubContentsResponse = {
  name: string;
  path: string;
  sha: string;
  size: string;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  _links: string;
  self: string;
  git: string;
  html: string;
};

type Image = {
  name: string;
  url: string;
};

const REQUEST_URL = "https://api.github.com/repos/ThePrimeagen/anime/contents"

export async function getListOfImages() {
  try {
    const response = await fetch(REQUEST_URL)
  } catch (error) {
    
  }
}
