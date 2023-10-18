const user = require('../models/userModels');
const bcyptjs = require('bcryptjs');

// insert data:::

const insert_data = async (req, res) => {

  try {

    const users = new user({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      images: req.file.filename

    });
    const userData = await users.save();
    const userId = userData._id;
    res.status(200).send({ msg: "Your data has been inserted. And your id is ", data: userId });
  }
  catch (error) {

    res.status(400).send(error.message);
  }
}


// update data:::-

const update_data = async (req, res) => {

  try {


    const id = req.body.id;

    const ValidID = await user.findOne({ _id: id });

    if (ValidID) {

      const newtitle = await req.body.title;
      const newdescription = req.body.description;
      const newprice = req.body.price;
      const newimages = req.file.filename;

      const userData = await user.findByIdAndUpdate({ _id: id }, {
        $set: { title: newtitle, description: newdescription, price: newprice, images: newimages }
      });

      res.status(200).send({ success: true, msg: "Your data has been updated" });


    }
    else {
      res.status(200).send("Invalid User ID ");
    }

  }
  catch (error) {

    res.status(400).send(error.message);
  }
}


// Delete API::-

const delete_data = async (req, res) => {

  try {

    const id = req.params.id;
    //const id = req.body.id;

    const ValidID = await user.findOne({ _id: id });

    if (ValidID) {

      const userData = await user.deleteOne({ _id: id });

      res.status(200).send({ success: true, msg: "Your data has been deleted" });

    }
    else {
      res.send("Invalid ID");
    }

  } catch (error) {
    res.send(error.message);
  }
}

// GetAllData ::- GET

const get_all_data = async (req, res) => {

  try {

    const getData = await user.find();
    res.status(200).send({ success: true, msg: "All Data are-", data: getData })

  } catch (error) {
    res.send(error.message)
  }
}

// Get Particular Data

const get_data = async (req, res) => {

  try {


    const id = req.params.id;
    //const id = req.body.id;
    const findData = await user.findOne({ _id: id });

    if (findData) {

      res.status(200).send({ success: true, msg: "Your data is ", data: findData });

    }
    else {
      res.send("Invalid ID");
    }



  } catch (error) {
    res.send(error.message);
  }

}


module.exports = {
  insert_data,
  update_data,
  delete_data,
  get_all_data,
  get_data
}