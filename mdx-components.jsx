import { Header } from './components/header';


function Row({ id, children }) {
    return (
      <div id={id} className="row">
        <div className="center-content">
          <div id={`${id}-content`}>{children}</div>
        </div>
      </div>
    );
  }
 
const components = {Row, Header}
 
export function useMDXComponents() {
  return components
}