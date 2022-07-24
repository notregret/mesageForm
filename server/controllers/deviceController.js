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
    async update(req, res, next) {
        try {
            let { messages, id, channels} = req.body;
            let formInfo = await FormInfo.findOne(
                {
                    where: {id}
                }
            )
            await ChannelInfo.destroy(
                {
                    where: {formInfoId: id}
                }
            )

            messages.forEach(i =>
                ChannelInfo.create({
                    name: i.name,
                    text: i.text,
                    keyboard_type: i.keyBoardType,
                    buttons: i.buttonsArray,
                    buttons_type: i.buttonsType,
                    formInfoId: id
                })
            )


            // await jane.update({ name: "Ada" })
            // await jane.save()
            return res.json(formInfo);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
  async getAll(req, res) {
    const forms = await Forms.findAll();
    const channels = await Channel.findAll();
    let view = {'forms': forms, 'channels': channels}
    return res.json(view)
  }
  async getOne(req, res) {
      const {id} = req.params;
      let view = {};
      const formInfo = await FormInfo.findOne(
          {
              where: {id},
              include: [{model: ChannelInfo, as: 'channel_infos'}]
          }
      )
      const form = await Forms.findOne(
          {
              where: {id}

          }
      )
      let messageArr = []
      formInfo.channel_infos.forEach(message => {
          let newForm = {};
          newForm['id'] = message.id;
          newForm['buttonsArray'] = [];
          message.buttons.split(',').forEach(button => {
              if (button.length > 0)
               newForm['buttonsArray'].push({'buttonStatus': true, 'text': button})
          })

          newForm['buttonsType'] = message.buttons_type;
          newForm['keyBoardType'] = message.keyboard_type;
          newForm['name'] = message.name;
          newForm['text'] = message.text;
          messageArr.push(newForm)
      })


      const channels = await Channel.findAll();
      view['channel_data'] = channels;
      view['formData'] = messageArr;
      view['selectedChannels'] = formInfo.channels.split(',');
      view['name'] = form.name

      return res.json(view)
  }
}

module.exports = new DeviceController();
