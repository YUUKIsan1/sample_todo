import react, { useEffect } from 'react';

function DocumentTitle() {
    useEffect(() => {
        document.title = 'New Page title';

        //Cleanup function
        rearn () => {
            document.title = 'React App';
        };
    },[]);

    return () => {
        <div>
            <h1>Document Title Example</h1>
            <p>This component will update the document title.</p>
        </div>
    };
}

export default DocumentTitle;