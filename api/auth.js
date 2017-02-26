import { Router } from 'express';
import express from 'express';
import models from '../src/models';
import multer from 'multer';
import bcrypt from 'bcryptjs';
const upload = multer();

const { User } = models;
const authRouter = new Router();

import bodyParser from 'body-parser';
authRouter.use( bodyParser.urlencoded( { extended: false } ) );
authRouter.use( bodyParser.json() );
authRouter.use( express.static( 'public' ) );

authRouter.get( '/profile', async ( req, res ) => {
  if ( req.session.loggedInUserId ) {
    const user = await User.findById( id: req.session.loggedInUserId );
    if ( user ) {
      const { username, email, rest } = user;
      return res.json( { username, email, rest } );
    }
  }
} );

authRouter.post( '/check', ( req, res ) => {
  if ( req.session.loggedInUserId ) {
    const userId = req.session.loggedInUserId;
    const userName = req.session.loggedInUserName;
    return res.json( {
      status: true,
      userId,
      userName,
    } );
  }
  res.json( {
    status: false,
  } );
} );

authRouter.post( '/signup', upload.single( 'icon' ), async ( req, res ) => {
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

    const check_password = await User.find( {
      where: {
        password,
      },
    } );


    if ( check_user_name || check_user_email || check_password ) {
      res.json( { status: false } );
      return;
    }
    const user = await User.create( {
      name,
      password,
      email,
      icon: req.file,
      win_num: 0,
      lose_num: 0,
      tie_num: 0,
    } );
    res.json( { user, status: true } );
  }
  catch ( err ) {
    console.error( err );
  }
} );

authRouter.post( '/login', async ( req, res ) => {
  try {
    const { password, name } = req.body;
    const user = await User.find( {
      where: {
        password,
      },
    } );
    if ( !user ) {
      res.json( { status: false } );
      return;
    }
    if ( password === user.password ) {
      req.session.loggedInUserId = user.id;
      req.session.loggedInUserName = user.name;
      res.json( { status: true } );
    }
    else
      res.json( { status: false } );
  }
  catch ( err ) {
    console.log( err );
  }
} );

authRouter.post( '/logout', ( req, res ) => {
  req.session.destroy();
  res.json( {
    status: true,
  } );
} );


export default authRouter;
