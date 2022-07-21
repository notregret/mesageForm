
const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Channel = sequelize.define('channel', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    max_textarea_symbols_default: {type: DataTypes.INTEGER},
    max_buttons_count_default: {type: DataTypes.INTEGER},
    max_buttons_symbols_default: {type: DataTypes.INTEGER},
    link_support_default: {type: DataTypes.BOOLEAN},
    max_textarea_symbols_inline: {type: DataTypes.INTEGER},
    max_buttons_count_inline: {type: DataTypes.INTEGER},
    max_buttons_symbols_inline: {type: DataTypes.INTEGER},
    link_support_inline: {type: DataTypes.BOOLEAN}
} )

const Forms = sequelize.define('forms', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
})

const FormInfo = sequelize.define('form_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    channels: {type: DataTypes.STRING},

})

const ChannelInfo = sequelize.define('channel_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    text: {type: DataTypes.STRING},
    keyboard_type: {type: DataTypes.STRING},
    buttons: {type: DataTypes.STRING},
    buttons_type:{type: DataTypes.STRING}

} )

const KeyBoardTypes = sequelize.define('keyboard_types', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    type: {type: DataTypes.INTEGER}
})
FormInfo.belongsTo(Forms)

FormInfo.hasMany(ChannelInfo)
ChannelInfo.belongsTo(FormInfo)

// const BasketDevice = sequelize.define('basket_device', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// } )
//
// const Device = sequelize.define('device', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     name: {type: DataTypes.STRING, unique: true, allowNull: false},
//     price: {type: DataTypes.INTEGER, allowNull:false},
//     rating: {type: DataTypes.INTEGER, defaultValue: 0},
//     img: {type: DataTypes.TEXT, allowNull:false},
//     password: {type: DataTypes.STRING},
// })
//
// const Type = sequelize.define('type', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     name: {type: DataTypes.STRING, unique: true, allowNull: false},
// } )
//
// const Brand = sequelize.define('brand', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     name: {type: DataTypes.STRING, unique: true, allowNull: false},
// } )
//
// const Rating = sequelize.define('rating', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     rate: {type: DataTypes.INTEGER, allowNull: false},
// } )
//
// const DeviceInfo = sequelize.define('device_info', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     title: {type: DataTypes.STRING, unique: true, allowNull: false},
//     description: {type: DataTypes.STRING, unique: true, allowNull: false},
// } )
//
// const TypeBrand = sequelize.define('type_brand', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// } )
//
// User.hasOne(Basket)
// Basket.belongsTo(User)
//
// User.hasMany(Rating)
// Rating.belongsTo(User)
//
// Basket.hasMany(BasketDevice)
// BasketDevice.belongsTo(Basket)
//
// Type.hasMany(Device)
// Device.belongsTo(Type)
//
// Brand.hasMany(Device)
// Rating.belongsTo(Device)
//
// Device.hasMany(Rating)
// DeviceInfo.belongsTo(Device)
//
// Device.hasMany(BasketDevice)
// BasketDevice.belongsTo(Device)
//
// Device.hasMany(DeviceInfo, {as: 'info'})
// DeviceInfo.belongsTo(Device)
//
// Type.belongsToMany(Brand, {through: TypeBrand})
// Brand.belongsToMany(Type, {through: TypeBrand})

module.exports = {
    Forms,
    FormInfo,
    Channel,
    ChannelInfo,
    KeyBoardTypes
}
