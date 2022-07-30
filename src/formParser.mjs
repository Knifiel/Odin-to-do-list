export function parseForm(form){
    const formData = new FormData(form);
    const type = form.dataset.type;
    let title, dueDate, priority, description, checklist;
    for (const pair of formData.entries()) {
        switch(pair[0]){
            case 'title':
                title = pair[1];
                break;
            case 'dueDate':
                dueDate = pair[1];
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
    if(type === 'project'){
        return {type, title, priority};
    } else{
        return {type, title, dueDate, priority, description, checklist};
    }
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