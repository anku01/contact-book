const Contact = require('./models/contact');
const Joi = require('Joi');

module.exports = [{
  method: 'GET',
  path: '/public/{file}',
  handler: (request, h) => {
    return h.file(request.params.file);
  }
}, {
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return h.view('home');
  }
}, {
  method: 'GET',
  path: '/contact/add',
  handler: (request, h) => {
    return h.view('addContact');
  }
}, {
  method: 'POST',
  path: '/contact/addContact',
  handler: (request, h) => {
    const promise = new Promise((resolve, reject) => {
      const contact = new Contact({
        fName: request.payload.fName,
        lName: request.payload.lName,
        mobile: request.payload.mobile,
        empId: request.payload.empId
      });
      contact.save((err, savedContact) => {
        if (err) {
          console.log(err);
          reject(h(err).code(500));
        }else
        resolve({'message': 'contact added succussfully!'});
      });
    });
    return promise;
  },
  options: {
    validate: {
      payload: {
        fName: Joi.string().required(),
        lName: Joi.string().required(),
        mobile: Joi.number().required(),
        empId: Joi.required()
      }
    }
  }
}, {
  method: 'GET',
  path: '/allcontacts',
  handler: (request, h) => {
    const promise = new Promise((resolve, reject) => {
      Contact.find((error, contacts) => {
        if (error) {
          console.error(error);
        }
        resolve({'contacts': contacts});
      });
    });
    return promise;
  }
},
{
  method: 'POST',
  path: '/searchContacts',
  handler: (request, h) => {
    if( !!request.payload.fName) request.payload.fName = {'$regex': request.payload.fName, '$options': 'i'};
    if( !!request.payload.lName) request.payload.lName = {'$regex': request.payload.lName, '$options': 'i'};
    if( !!request.payload.mobile) request.payload.mobile = request.payload.mobile;
    if( !!request.payload.empId) request.payload.empId = {'$regex': request.payload.empId, '$options': 'i'};
    const promise = new Promise((resolve, reject) => {
      Contact.find(request.payload, (error, contacts) => {
        console.log("in Error" , error);
        if (error) {
          console.error(error);
        }
        resolve({'contacts': contacts});
      });
    });
    return promise;
  }
},
 {
  method: 'DELETE',
  path: '/contact/delete/{id}',
  handler: (request, h) => {
    const promise = new Promise((resolve, reject) => {
      Contact.deleteOne({
        _id: request.params.id
      }, (err, result) => {
        if (err) {
          reject(err, 'Internal MongoDB error');
        }
        if (result.n === 0) {
          reject(new Error('contact not found'));
        }
        resolve({message: 'contact deleted succussfully'});
      });
    });
    return promise;
  }
}, {
  method: 'GET',
  path: '/contact/edit/{id}',
  handler: (request, h) => {
    const promise = new Promise((resolve, reject) => {
      Contact.findById(request.params.id, (error, contact) => {
        if (error) {
          console.error(error);
        }
        resolve(contact);
      });
    });
    return promise;
  }
}, {
  method: 'PUT',
  path: '/contact/update/{id}',
  handler: (request, h) => {
    const promise = new Promise((resolve, reject) => {
      Contact.updateOne({
        _id: request.params.id
      }, {
        $set: request.payload
      }, (err, result) => {
        if (err) {
          reject(err, 'Internal MongoDB error');
        }
        if (result.n === 0) {
          reject(new Error('contact not found'));
        }
        resolve({message: 'contact updated'});
      });
    });
    return promise;
  },
  options: {
    validate: {
      payload: {
        fName: Joi.string().required(),
        lName: Joi.string().required(),   
        mobile: Joi.number().required(),
        empId: Joi.required()
      }
    }
  }
}, {
  method: 'PATCH',
  path: '/contact/partialUpdate/{id}',
  handler: (request, h) => {
    const promise = new Promise((resolve, reject) => {
      Contact.updateOne({
        _id: request.params.id
      }, {
        $set: request.payload
      }, (err, result) => {
        if (err) {
          reject(err, 'Internal MongoDB error');
        }
        resolve('contact updated');
      });
    });
    return promise;
  },
  options: {
    validate: {
      payload: Joi.object({
        fName: Joi.string().optional(),
        lName: Joi.string().optional(),
        mobile: Joi.string().length(10),
        empId: Joi.optional()
      }).required().min(1)
    }
  }
}, {
  method: [ 'GET', 'POST' ],
  path: '/{any*}',
  handler: (request, h) => {
    return h.view('404').code(404);
  }
}];
