# Odin-to-do-list

simple to-do list application.

main project idea:

create class to create task objects
Each object needs to have those properties:
    - title
    - due date
    - optional message
    - priority(high or low)
and methods to get get/set them.
{
title: string
due_date: date
message: string
priority: boolean
    --getters and setters--
}

Then we need a storage for those objects.
It will be an object with an array which will either store task object as is, or group them up by some category which will be instances of this storage class themselves.
It should have methods to add new object, remove object and move object.
{
    category: 'main',
    tasks:
[   
    {task1},
    {task2},
    {category: '1', 
    tasks:
            [{task1},
             {task2},
             {category...}], 
    } 
]
    
    add(object-to-add, index1, ...inside-indexes  )//if inside indexes not provided, insert object into main array at index1, else pass object-to-add and inside-indexes as argument do add method of object at index1)

    remove(index1, ...indexes)//if no indexes provided, removes object at index1, else passes ...indexes to remove method of object at index1.


