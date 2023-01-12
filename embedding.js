const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
    // _id:String,
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    authors: [authorSchema]
}));

async function createCourse(name, authors) {
    const course = new Course({
        name,
        authors
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course.find();
    console.log(courses);
}

async function updateAuthor(courseId) {
    const course = await Course.update({_id: courseId}, {
        $set:{
            'author.name':'Russel Van Dulken'

        }
    });
}

async function addAuthor(courseId, author){
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
}

async function removeAuthor(courseId){
    const course = await Course.findById(courseId)
    let index = course.authors.length;
    for(let i = 0; i < index; i++){
        course.authors.pop();
    }
    course.save();
    // const author = course.authors.id(authorId);
    // author.remove();
    // course.save();
}


//  createCourse('Testing', [
//      new Author({ name: 'test' }),
//      new Author({ name: 'test1' })
// ]);

// updateAuthor('639b19e085580ebf729605e9'); removeAuthor('639b1cc18b15ebdd55e6826d', '');
 addAuthor('63c022662db75c052c29472f', new Author({ name: 'lirak'}));
//  removeAuthor('639b2974c22ffabad172b5b4');