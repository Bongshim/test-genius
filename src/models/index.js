const Sequelize = require('sequelize');
const { sequelize } = require('../config/config');
const logger = require('../config/logger');

const sequelizeInstance = new Sequelize(sequelize.url);
const db = {};

sequelizeInstance
  .authenticate()
  .then(() => logger.info('DB connected'))
  .catch((err) => {
    logger.error(err);
  });

db.sequelize = sequelizeInstance;
db.Sequelize = Sequelize;

// import models here below
db.user = require('./user.model')(sequelizeInstance, Sequelize);
db.tokens = require('./token.model')(sequelizeInstance, Sequelize);
db.roles = require('./role.model')(sequelizeInstance, Sequelize);
db.permission = require('./permission.model')(sequelizeInstance, Sequelize);
db.variable = require('./variables.model')(sequelizeInstance, Sequelize);
db.message_template = require('./message_template.model')(sequelizeInstance, Sequelize);
db.media = require('./media.model')(sequelizeInstance, Sequelize);
db.blog = require('./blog.model')(sequelizeInstance, Sequelize);
db.tag = require('./tag.model')(sequelizeInstance, Sequelize);
db.category = require('./category.model')(sequelizeInstance, Sequelize);
db.test = require('./test.model')(sequelizeInstance, Sequelize);
db.testIntro = require('./test_intro.model')(sequelizeInstance, Sequelize);
db.section = require('./sections.model')(sequelizeInstance, Sequelize);
db.question = require('./question.model')(sequelizeInstance, Sequelize);
db.options = require('./options.model')(sequelizeInstance, Sequelize);
db.testHistory = require('./test_history.model')(sequelizeInstance, Sequelize);
db.testResult = require('./result_table.model')(sequelizeInstance, Sequelize);
db.subscription = require('./subscription.model')(sequelizeInstance, Sequelize);
db.subscriptionPlan = require('./subscription_plan.model')(sequelizeInstance, Sequelize);
db.features = require('./features.model')(sequelizeInstance, Sequelize);
db.transaction = require('./transaction.model')(sequelizeInstance, Sequelize);
db.activeSubscription = require('./active_subscription.model')(sequelizeInstance, Sequelize);
db.promotion = require('./promotion.model')(sequelizeInstance, Sequelize);

//= ==============================
// Define all relationships here below
//= ==============================

// User - Token
db.user.hasOne(db.tokens, { foreignKey: 'userId', as: 'userToken' });
db.tokens.belongsTo(db.user, { foreignKey: 'userId', as: 'userToken' });

// Role - Permission
db.roles.belongsToMany(db.permission, { through: 'role_permisson' });
db.permission.belongsToMany(db.roles, { through: 'role_permisson' });

// User - Role
db.user.belongsToMany(db.roles, { through: 'user_role' });
db.roles.belongsToMany(db.user, { through: 'user_role' });

// Message Template - Variable
db.message_template.belongsToMany(db.variable, { through: 'message_variable', onDelete: 'cascade' });
db.variable.belongsToMany(db.message_template, { through: 'message_variable' });

// User - Message Template
db.user.belongsToMany(db.message_template, { through: 'user_message_template' });
db.message_template.belongsToMany(db.user, { through: 'user_message_template' });

// Media - Blog
db.media.belongsToMany(db.blog, { through: 'blog_media', foreignKey: 'mediaId' });
db.blog.belongsToMany(db.media, { through: 'blog_media' });

// User - Blog
db.user.hasMany(db.blog, { foreignKey: 'authorId', as: 'userBlog' });
db.blog.belongsTo(db.user, { foreignKey: 'authorId', as: 'userBlog' });

// Test - Tag
db.test.belongsToMany(db.tag, { through: 'test_tag', foreignKey: 'testId' });
db.tag.belongsToMany(db.test, { through: 'test_tag' });

// Test - Category
db.category.hasOne(db.test, { foreignKey: 'categoryId', as: 'categoryTest' });
db.test.belongsTo(db.category, { foreignKey: 'categoryId', as: 'categoryTest' });

// User - Test
db.user.hasMany(db.test, { foreignKey: 'examinerId', as: 'userTest' });
db.test.belongsTo(db.user, { foreignKey: 'examinerId', as: 'userTest' });

// Test - Test Intro
db.testIntro.hasOne(db.test, { foreignKey: 'introId', as: 'testTestIntro' });
db.test.belongsTo(db.testIntro, { foreignKey: 'introId', as: 'testTestIntro' });

// Test - Section
db.test.hasMany(db.section, { foreignKey: 'testId', as: 'testSection' });
db.section.belongsTo(db.test, { foreignKey: 'testId', as: 'testSection' });

// Section - Question
db.section.hasMany(db.question, { foreignKey: 'sectionId', as: 'sectionQuestion' });
db.question.belongsTo(db.section, { foreignKey: 'sectionId', as: 'sectionQuestion' });

// Question - Answer
db.question.belongsToMany(db.options, { through: 'question_answer', foreignKey: 'questionId' });
db.options.belongsToMany(db.question, { through: 'question_answer', foreignKey: 'answerId' });

// Question - Options
db.question.belongsToMany(db.options, { through: 'question_option', foreignKey: 'questionId' });
db.options.belongsToMany(db.question, { through: 'question_option', foreignKey: 'optionId' });

// Question - Media
db.question.belongsToMany(db.media, { through: 'question_media', foreignKey: 'questionId' });
db.media.belongsToMany(db.question, { through: 'question_media', foreignKey: 'mediaId' });

// Answer - Media
db.options.belongsToMany(db.media, { through: 'answer_media', foreignKey: 'optionId' });
db.media.belongsToMany(db.options, { through: 'answer_media', foreignKey: 'mediaId' });

// Test - Test History
db.test.hasMany(db.testHistory, { foreignKey: 'testId', as: 'testTestHistory' });
db.testHistory.belongsTo(db.test, { foreignKey: 'testId', as: 'testTestHistory' });

// User - Test History
db.user.hasMany(db.testHistory, { foreignKey: 'userId', as: 'userTestHistory' });
db.testHistory.belongsTo(db.user, { foreignKey: 'userId', as: 'userTestHistory' });

// Test Result - Question
db.question.hasMany(db.testResult, { foreignKey: 'questionId', as: 'questionTestResult' });
db.testResult.belongsTo(db.question, { foreignKey: 'questionId', as: 'questionTestResult' });

// Test Result - Test History
db.testResult.belongsToMany(db.testHistory, { through: 'test_history_result', foreignKey: 'resultId' });
db.testHistory.belongsToMany(db.testResult, { through: 'test_history_result', foreignKey: 'testHistoryId' });

// Test Result - Options
db.testResult.belongsToMany(db.options, { through: 'test_result_option', foreignKey: 'resultId' });
db.options.belongsToMany(db.testResult, { through: 'test_result_option', foreignKey: 'optionId' });

// Subscription Plan - media
db.media.hasOne(db.subscriptionPlan, { foreignKey: 'mediaId', as: 'mediaSubscriptionPlan' });
db.subscriptionPlan.belongsTo(db.media, { foreignKey: 'mediaId', as: 'mediaSubscriptionPlan' });

// Subscription Plan - Features
db.subscriptionPlan.belongsToMany(db.features, { through: 'subscription_plan_features', foreignKey: 'subscriptionPlanId' });
db.features.belongsToMany(db.subscriptionPlan, { through: 'subscription_plan_features', foreignKey: 'featureId' });

// Subscription - Subscription Plan
db.subscriptionPlan.hasOne(db.subscription, { foreignKey: 'subscriptionPlanId', as: 'subscriptionPlanSubscription' });
db.subscription.belongsTo(db.subscriptionPlan, { foreignKey: 'subscriptionPlanId', as: 'subscriptionPlanSubscription' });

// Subscription - User
db.user.hasOne(db.subscription, { foreignKey: 'userId', as: 'userSubscription' });
db.subscription.belongsTo(db.user, { foreignKey: 'userId', as: 'userSubscription' });

// Subscription - Transaction
db.transaction.hasOne(db.subscription, { foreignKey: 'transactionId', as: 'transactionSubscription' });
db.subscription.belongsTo(db.transaction, { foreignKey: 'transactionId', as: 'transactionSubscription' });

// Subscription - Active Subscription
db.subscription.hasOne(db.activeSubscription, { foreignKey: 'subscriptionId', as: 'subscriptionActiveSubscription' });
db.activeSubscription.belongsTo(db.subscription, { foreignKey: 'subscriptionId', as: 'subscriptionActiveSubscription' });

// Promotion - Transaction
db.promotion.hasOne(db.transaction, { foreignKey: 'promotionId', as: 'promotionTransaction' });
db.transaction.belongsTo(db.promotion, { foreignKey: 'promotionId', as: 'promotionTransaction' });

module.exports = {
  db,
};
