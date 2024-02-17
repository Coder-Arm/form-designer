    import {jsonData} from "./jsonData.js"
    // console.log(jsonData)

    const componentContainer = document.querySelector('.components');
    const formContainer = document.querySelector('.form-container')


    function handleAdd(element){
        
        if(element.type === 'select'){
            jsonData.push({
                id : Date.now().toString() ,
                label: "Sample Label",
                options:['Sample Option', 'Sample Option', 'Sample Option'],
                type : 'select'
            })
            }
            else{
                jsonData.push({
                    id : Date.now().toString() ,
                    label: "Sample Label",
                placeholder : 'Sample Placeholder',
                type : element.type
                })
            }

        const formItem = document.createElement('div');
        formItem.className = 'form-item';
        formItem.id = `field-${jsonData[jsonData.length-1].id}`;
        formItem.draggable = true
        formItem.innerHTML = `
            <div class='label-btn'>
                <label for=${'field-'+Date.now()}>${element.label}</label>
                <button class='del-btn' id=${Date.now()}><i class="fa-solid fa-trash"></i></button>
            </div>
            ${ element.type === 'select' ? 
            ` <select class='field'>
                <option default>Choose Option</option>
                ${element.options.map((option) => {
                    return `<option value=${option}>${option}</option>`
                })}
            </select>`
            : ` <${element.type} class='field' placeholder=${element.placeholder}></${element.type}>`
            }
        `
        
        const dropItem = document.createElement('div');
        dropItem.classList = 'dropbox'
        dropItem.style.height = '10px'
        // console.log(jsonData)
        formContainer.append(formItem,dropItem)

        
        const delBtns = document.querySelectorAll('.del-btn');
        // console.log(delBtns.length);
        delBtns.forEach((btn,idx) => {
            btn.addEventListener('click',(e) => {
                const formItem = e.target.parentElement.parentElement.parentElement;
                const indexToRemove = jsonData.findIndex(item => item.id === formItem.id.slice(6));
        
                if (indexToRemove !== -1) {
                    jsonData.splice(indexToRemove, 1);
                }
                if(e.target.parentElement.parentElement.parentElement.nextSibling?.className === 'dropbox'){
                    const dropbox = e.target.parentElement.parentElement.parentElement.nextSibling;
                   dropbox.remove()
               }
                
                formItem.remove();
            })
        })

        dragNdrop()
    }

    function rearrangedRender(){
        document.querySelectorAll('.dropbox').forEach(dropbox => {
           dropbox.remove();
        })
        const formItems = document.querySelectorAll('.form-item')
          for(let i = 0; i < formItems.length; i++){
            const dropItem = document.createElement('div');
            dropItem.className = 'dropbox'
            dropItem.style.height = '10px'
            formItems[i].insertAdjacentElement('afterend',dropItem)
            dragNdrop()
        }
    }
    
        function renderFormFields(){
        jsonData.forEach((element,idx) => {

        // for sidebar
        const eachComponent = document.createElement('div');
        eachComponent.className = 'each-component' 
        eachComponent.id = element.id
        eachComponent.innerHTML = `
        <span>${element.type[0].toUpperCase()+element.type.slice(1)}</span>
        <span><i class="fa-solid fa-plus"></i></span>
        `

        componentContainer.appendChild(eachComponent)
        eachComponent.addEventListener('click', () => handleAdd(element))

        // For form
        const formItem = document.createElement('div');
        formItem.className = 'form-item';
        formItem.id = `field-${element.id}`
        formItem.draggable = true
        formItem.innerHTML = `
            <div class='label-btn'>
                <label for=${'field-'+element.id}>${element.label}</label>
                <button type='button' class='del-btn'><i class="fa-solid fa-trash"></i></button>
            </div>
            ${ element.type === 'select' ? 
            ` <select class='field'>
                <option default>Choose Option</option>
                ${element.options.map((option) => {
                    return `<option value=${option}>${option}</option>`
                })}
            </select>`
            : ` <${element.type} class='field' placeholder=${element.placeholder}></${element.type}>`
            }
        `
            const dropItem = document.createElement('div')
            dropItem.className = 'dropbox'
            dropItem.style.height = '10px'

            
            formContainer.append(formItem,dropItem);

        }) 

    }
    renderFormFields();
     

        function dragNdrop(){

            const formItems = document.querySelectorAll('.form-item');
            // console.log('formItems',formItems);
            formItems.forEach(formItem => {
                formItem.addEventListener('dragstart',(e) => {
                    e.dataTransfer.setData('text/plain', formItem.id);
                })
                formItem.addEventListener('dragover',(e) => {
                   e.preventDefault();
                })
                
            })
             
            const dropItems = document.querySelectorAll('.dropbox');
            dropItems.forEach(dropItem => {
                dropItem.addEventListener('dragenter',(e) => {
                    e.preventDefault();
                    e.target.style.minHeight = '100px';
                   
                })
                dropItem.addEventListener('dragleave',(e) => {
                    e.preventDefault()
                    e.target.style.minHeight = '';
                })
                dropItem.addEventListener('dragover', (e) => {
                    e.preventDefault(); 
                });
                dropItem.addEventListener('drop',(e) => {
                    e.preventDefault();
                  const draggedItemId = e.dataTransfer.getData('text/plain');
                  const draggedItem = document.getElementById(draggedItemId);
                    dropItem.insertAdjacentElement('afterend',draggedItem)
                    rearrangedRender()
                })
            })
           
           
        }

        dragNdrop();
     

        const delBtns = document.querySelectorAll('.del-btn');
        // console.log(delBtns.length);
        delBtns.forEach((btn,idx) => {
            btn.addEventListener('click',(e) => {
                const formItem = e.target.parentElement.parentElement.parentElement;
                const indexToRemove = jsonData.findIndex(item => item.id === formItem.id.slice(6));
        
                if (indexToRemove !== -1) {
                    jsonData.splice(indexToRemove, 1);
                }
                if(e.target.parentElement.parentElement.parentElement.nextSibling?.className === 'dropbox'){
                     const dropbox = e.target.parentElement.parentElement.parentElement.nextSibling;
                    dropbox.remove()
                }
                
                
                formItem.remove();
            })
        })

    const saveBtn = document.querySelector('.save-btn');

    saveBtn.addEventListener('click',() => {
        const formItems = document.querySelectorAll('.form-item');
        // console.log('formItems',formItems);
        const updatedJsonData = [];
        formItems.forEach(item => {
            // console.log(item.id)
            for(let i = 0; i < jsonData.length; i++){
                // console.log(jsonData[i])
                    if(jsonData[i].id == item.id.slice(6)){
                        updatedJsonData.push(jsonData[i]);
                        break;
                    }
            }
            
        })
        console.log(updatedJsonData);
    })
    
    