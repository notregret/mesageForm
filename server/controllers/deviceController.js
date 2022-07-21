const { Forms, FormInfo, ChannelInfo, Channel } = require("../models/models");
const { nextTick } = require("process");
const ApiError = require("../error/ApiError");

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, channels, info } = req.body;
      const form = await Forms.create({
        name
      });
      await FormInfo.create({
              channels,
              formId: form.id})
      info.forEach(i =>
          ChannelInfo.create({
              name: i.name,
              text: i.text,
              keyboard_type: i.keyBoardType,
              buttons: i.buttonsArray,
              buttons_type: i.buttonsType,
              formInfoId: form.id
          })
      )
    return res.json(form);
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let forms = await Forms.findAll();
    return res.json(forms)
    // let { brandId, typeId, limit, page } = req.query;
    // page = page || 1;
    // limit = limit || 9;
    // let offset = page * limit - limit;
    // let devices;
    // if (!brandId && !typeId) {
    //
    // }
    // if (brandId && !typeId) {
    //   devices = await Device.findAndCountAll({
    //     where: { brandId },
    //     limit,
    //     offset,
    //   });
    // }
    // if (!brandId && typeId) {
    //   devices = await Device.findAndCountAll({
    //     where: { typeId },
    //     limit,
    //     offset,
    //   });
    // }
    // if (brandId && typeId) {
    //   devices = await Device.findAndCountAll({
    //     where: { brandId, typeId },
    //     limit,
    //     offset,
    //   });
    // }
    // return res.json(devices);
  }
  async getOne(req, res) {
      const {id} = req.params;
      let view = {};
      const form = await FormInfo.findOne(
          {
              where: {id},
              include: [{model: ChannelInfo, as: 'channel_infos'}]
          }
      )
      const channels = await Channel.findAll();
      view['channel_data'] = channels;
      view['formData'] = form

      return res.json(view)
  }
}

module.exports = new DeviceController();
