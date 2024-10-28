function getYouTubeId(url: string) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([\w-]{11})/;
  const match = url.match(regex);
  return match && match[1];
}

export default getYouTubeId;
