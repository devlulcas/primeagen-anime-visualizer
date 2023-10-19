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

function isGithubContentsResponse(obj: any): obj is GithubContentsResponse {
  return (
    typeof obj === 'object' &&
    typeof obj.name === 'string' &&
    typeof obj.download_url === 'string'
  );
}

function isGithubContentsResponseArray(
  obj: any
): obj is GithubContentsResponse[] {
  return Array.isArray(obj) && obj.every(isGithubContentsResponse);
}

type Image = {
  name: string;
  url: string;
  size: string;
  originalUrl: string;
};

const REQUEST_URL = 'https://api.github.com/repos/ThePrimeagen/anime/contents';

export async function getListOfImages() {
  const headers = new Headers({
    Accept: 'application/vnd.github.v3+json',
  });

  try {
    const response = await fetch(REQUEST_URL, { headers });

    if (response.status !== 200) {
      return [];
    }

    const json = await response.json();

    if (!isGithubContentsResponseArray(json)) {
      return [];
    }

    const ignoredFileExtensions = /\.(md|bmp)$/;

    const images: Image[] = [];

    for (const file of json) {
      if (ignoredFileExtensions.test(file.name)) {
        continue;
      }

      images.push({
        name: file.name,
        url: file.download_url,
        size: (Number(file.size) / (1024 * 1024)).toPrecision(2) + 'MB',
        originalUrl: file.html_url,
      });
    }

    return images;
  } catch (error) {
    console.error(error);
    return [];
  }
}
