import { useConfig } from '@chainlit/react-client';

import { Markdown } from '@/components/Markdown';

interface Props {
  children: string;
}

const ToastMarkdown = ({ children }: Props) => {
  const { config } = useConfig();

  return (
    <Markdown
      allowHtml={config?.features?.unsafe_allow_html}
      latex={config?.features?.latex}
    >
      {children}
    </Markdown>
  );
};

export { ToastMarkdown };
