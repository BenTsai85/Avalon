import { Router } from 'express';
import models from '../src/models';

const { User } = models;
const articleRouter = new Router();
const bcrypt = require( 'bcryptjs' );

articleRouter.post( '/signup', async ( req, res ) => {
  try {
  	console.log( 'signup' );
    const { password, name, email } = req.body;
    console.log( { password, name, email } );
    const check_user_name = await User.find( {
	    where: {
	       name,
	    },
    } );
    const check_user_email = await User.find( {
	    where: {
	       email,
	    },
    } );
    if ( check_user_name || check_user_email ) {
    	res.json( { status: false } );
      	return;
    }
    const user = await User.create( {
      name,
      password,
      email,
      win_num: 0,
      lose_num: 0,
      tie_num: 0,
    } );
    res.json( { user, status: true } );
  }
  catch ( err ) {
    console.log( err );
  }
} );

articleRouter.post( '/login', async ( req, res ) => {
  try {
    const { password, name } = req.body;
    const user = await User.find( {
	    where: {
	      name,
	    },
  	} );
 	if ( !user ) {
   res.json( { status: false } );
   return;
 }
    console.log( password, user.password );
    if ( password === user.password ) {
      req.session.loggedInUserId = user.id;
      res.json( { status: true } );
    }
    else
		res.json( { status: false } );
  }
  catch ( err ) {
    console.log( err );
  }
} );


export default articleRouter;
