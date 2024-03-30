import { FlexLayout } from '@wrapper/FlexLayout';
import { Bottom } from '@wrapper/layout/Bottom';
import { createRoot } from 'react-dom/client';

const rootElement = new FlexLayout({ id: 'root' });
rootElement.dataset.direction = 'column';
document.body.append(rootElement);

const root = createRoot(rootElement);

root.render(<Bottom></Bottom>);
