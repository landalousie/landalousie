import { marked } from 'marked';

export const configureMarked = () => {
  const renderer = new marked.Renderer();

  renderer.link = ({ href, text }) => {
    return `<a class="text-primary-600 underline"
     href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  };

  marked.setOptions({
    renderer,
  });
};
