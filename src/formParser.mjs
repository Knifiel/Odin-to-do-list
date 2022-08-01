export function parseForm(form){
    const formData = new FormData(form);
    let title, dueDate, project, priority, description, checklist;
    for (const pair of formData.entries()) {
        switch(pair[0]){
            case 'title':
                title = pair[1];
                break;
            case 'dueDate':
                dueDate = pair[1];
                break;
            case 'project':
                project = pair[1];
                break;
            case 'priority':
                priority = pair[1];
                break;
            case 'description':
                description = pair[1];
                break;
            case 'checklist':
                checklist = parseChecklist(pair[1]);
                break;
        }
    }
        return {title, project, dueDate, priority, description, checklist};
    }

function parseChecklist(text){
    const array = text.split(/\r?\n/);
    const checklist = [];
    array.forEach(element => {
    const obj = {'text': element, 'isDone': false }
        checklist.push(obj);
    });
    return checklist; 
}