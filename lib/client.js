'use strict'

const request = require('request-promise')
const Promise = require('bluebird')

class Client {
  constructor (options) {
    this.options = options || {
      endpoints: {
        pictures: 'http://api.platzigram.com/picture',
        users: 'http://api.platzigram.com/user',
        auth: 'http://api.platzigram.com/auth'
      }
    }
  }

  getPicture (id, callback) {
    let options = {
      method: 'GET',
      uri: `${this.options.endpoints.pictures}/${id}`,
      json: true
    }

    return Promise.resolve(request(options)).asCallback(callback)
  }

  savePicture (picture, token, callback) {
    let options = {
      method: 'POST',
      uri: `${this.options.endpoints.pictures}/`,
      body: picture,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      json: true
    }

    return Promise.resolve(request(options)).asCallback(callback)
  }

  likePicture (id, callback) {
    let options = {
      method: 'POST',
      uri: `${this.options.endpoints.pictures}/${id}/like`,
      json: true
    }

    return Promise.resolve(request(options)).asCallback(callback)
  }

  listPictures (callback) {
    let options = {
      method: 'GET',
      uri: `${this.options.endpoints.pictures}/list`,
      json: true
    }
    return Promise.resolve(request(options)).asCallback(callback)
  }

  listPicturesByTag (tag, callback) {
    let options = {
      method: 'GET',
      uri: `${this.options.endpoints.pictures}/tag/${tag}`,
      json: true
    }
    return Promise.resolve(request(options)).asCallback(callback)
  }

  saveUser (user, callback) {
    let opts = {
      method: 'POST',
      uri: `${this.options.endpoints.users}/`,
      body: user,
      json: true
    }
    return Promise.resolve(request(opts)).asCallback(callback)
  }

  getUser (username, callback) {
    let opts = {
      method: 'GET',
      uri: `${this.options.endpoints.users}/${username}`,
      json: true
    }

    return Promise.resolve(request(opts)).asCallback(callback)
  }

  auth (username, password, callback) {
    let opts = {
      method: 'POST',
      uri: `${this.options.endpoints.auth}/`,
      body: {
        username,
        password
      },
      json: true
    }
    return Promise.resolve(request(opts)).asCallback(callback)
  }
}

module.exports = Client
