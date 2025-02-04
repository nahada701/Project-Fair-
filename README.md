      SQL                                               Mongo DB
------------------------------------------------------------------------------------------------------
-relational/sql DBMS                           -Document Oriented/NoSql DB

-store data in table with                      -store data as collection of JSON ducument
rows and column

-Fixed schema                                  -Dynamic Schema

-Optimizes for Complex join and                -Optimized for performsnce and scalabilty
 transaction

 -Support rich set of data types                -linited set of data types

 -Delcarative Query Language                     -Expressive Query Language based JSON

-ACID(Automicity,Consistency,ISolation           -CAP(Consistency,Availabilty,Partition telerence)
 ,Durability)

-Uses traditional business application           -used in big data and real time applications. 



mongosh commands:
-to show all databases: show databases
-to access a particular database-use database_name
-to show all collections of a database-show collections
-CRUD operations

-to read all documents of a collection - db.collection_name.find()
eg: db.users.find()

-to get single document using findOne() -db.collection_name.findOne({email:"max@gmail.com"}) if there is document satisfiying the condition it will return that or Null will be returned

-to read first n number of document using find().limit(n)


-to insert a single document to the collcetion using the command insertOne({key:"value"})

-to insert many document to the collection using insertMany([{key:"value"},{key:"value"}])

-to count total document inside a collection-db.collection_name.countDocument()

-sort 
-to sort either by ascenting or descenting using .sort() method
-db.collection_name.find().sort({key:1/-1})  1 means ascenting -1 means descenting

to remove a document from a sorted collection use .skip(n) method arg how many documents to be skipped  db.collection_name.find().sort({key:1/-1}).skip(1) skip first one document

to find using conditions

find({key:{$gt:value}})  greater than value
find({key:{$gte:value}}) greater than or equal to value
find({key:{$lt:value}})  less than value
find({key:{$lte:value}})  less than or equal to value

db.users.find({age:{$gt:20,$lt:30}}) gives age gt 20 and less than 30

eg:
db.users.find({age:{$lt:35}})

to find docmuents with values equal to some values 
find({key:{$in:[value,value,value]}})
to find docmuents with values not equal to some values 
find({key:{$nin:[value,value,value]}}) 

to find a particular key exists in any document
find({key:{$exists:true}})

db.users.find({age:{$gt:20,$lt:30}})


Comapnring two values

to find all document with a value of a key is greater than another value of another key

.find({$expr:{$gt:{"$highervaluekey","$lowervaluekey"}}})



eg:
db.users.find({$expr:{$gt:["$balance","$debit"]}})   here finding documents eith balance gt debit


Update
-------
db.users.updateMany({age:44},{$set:{age:30}})
setting all docmuents with age 44 to age 30


write an expression to update the age by incrementing 3 of a document with userName is milan

db.users.updateMany({age:44},{$inc:{age:3}})

{
  _id: ObjectId('677e4ae40c5e7a99753113a5'),
  userName: 'amita',
  hobbies: [
    'reading',
    'swimming',
    'drawing'
  ]
}

add another hobby to hobbies
                   
db.users.updateMany({userName:"amita"},{$push:{hobbies:"travelling"}})
                    what to update      method where    updating value    


Delete
---------
deleteOne({key:value})
deleteMany({key:value})

How to delete document have a particular key
deleteMany({key:{$exists:true}})
eg:
db.users.deleteMany({age:{$exists:true}})

JOIN:
join act as left join in sql the joined table have left table's all  feild but the right table feild will be there only if its matching with left table 
here join is aggregation

syntax{
    $lookup:{
        from:<collcetion to join>   
        localField:<field from input document>,
        foreignFeild:<feild from the document  of "from" collcetion>
        as:<output array field>
    }
}
Eg:

db.users.aggregate({$lookup:
{from:"projects",
localField:"email",
foreignField:"email",
as:"userProjects"
}
})











