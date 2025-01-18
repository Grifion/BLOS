export const resizeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  const textarea = e.target;
  textarea.style.height = "auto"; // Reset height to auto so it can grow/shrink
  textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
};
