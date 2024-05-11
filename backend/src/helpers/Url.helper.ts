export function createUploadUrl(path: string) {
  // path = src/public/upload/123123123-123123123.jpg
    // src/public should be removed
    path = path.replace('src/public/', '');
    return `http://localhost:3000/${path}`;
}