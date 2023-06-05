const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {validationResult, matchedData} = require('express-validator');

const State = require('../models/State');
const User = require('../models/User');
const Ads = require('../models/Ad');
const Category = require('../models/Category');

module.exports = {
  getStates: async (req, res) => {
    let states = await State.find();
    res.json({states});
  },
  info: async (req, res) => {
    let token = req.query.token;

    const user = await User.findOne({token});
    const state = await State.findById(user.state);
    const ads = await Ads.find({idUser: user._id.toString()});

    let adList = [];
    for(let i in ads){

      const cat = await Category.findById(ads[i].category);

      adList.push({
        id: ads[i]._id,
        status: ads[i].status,
        images: ads[i].images,
        dateCreated: ads[i].dateCreated,
        title: ads[i].title,
        price: ads[i].price,
        priceNegotiable: ads[i].ads[i].priceNegotiable,
        description: ads[i].description,
        views: ads[i].views,
        category: cat.slug
      });
    }

    res.json({
      name: user.name,
      email: user.email,
      state: state.name,
      ads: adList
    });
  },
  editAction: async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.json({error: errors.mapped()});
        return;
    };

    const data = matchedData(req);

    let updates = {};

    if(data.name) {
      updates.name = name
    }
    if(data.email) {
        const emailCheck = await User.findOne({email: data.email});
        if(emailCheck) {
          res.json({error: 'E-mail ja existente'});
          return;
        }
        updates.email = data.email;
    }

    if(date.state) {
      if(mongoose.Types.ObjectId.isValid(data.state)) {
        const stateCheck = await State.findById(data.state);
        if(!stateCheck) {
          res.json({error: 'Estado não existe'});
          return;
        }
        updates.state = data.state;
      }
    }

    if(data.password) {
      updates.passwordHash = await bcrypt.hash(data.password, 10);
    }

    await User.findOneAndUpdate({token: data.token}, {$set: updates});

    res.json({});
  }
};