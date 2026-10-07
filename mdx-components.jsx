import { Header } from './components/header';
import { DataTable } from './components/data-table';


function Row({ id, children }) {
    return (
      <div id={id} className="row">
        <div className="center-content">
          <div id={`${id}-content`}>{children}</div>
        </div>
      </div>
    );
  }
 
const components = {Row, Header, DataTable}
 
export function useMDXComponents() {
  return components
}