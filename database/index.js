const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: {
    type: Number,
    unique: true
  },           // repo_id
  name: String,         // repo_name
  description: String,  // repo_description
  html_url: String,     // repo_html_url
  created_at: Date,     // repo_created_url
  updated_at: Date,     // repo_updated_url
  watchers: Number,     // repo_watchers
  owner: String,        // owner_name
  owner_url: String     // owner_html_url
});

let Repo = mongoose.model('Repo', repoSchema);

let save = async (repos, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  let data = repos.map( repo => {
    return {
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      watchers: repo.watchers,
      owner: repo.owner.login,
      owner_url: repo.owner.html_url
    };
  });
  try {
    await Repo.insertMany(data);
    return callback(null);
  } catch (error) {
    return callback(error.message);
  }
};

let findTop = async (callback) => {
  try {
    let topData = await Repo.where('watchers').sort({ watchers: -1 }).limit(25);
    callback(null, topData);
  } catch (error) {
    console.log(error.message);
    callback(error.message, null);
  }
};

module.exports = {
  save: save,
  findTop: findTop
};