const statisticsService = require('./service');

exports.getStatisticsHandler = async (request, response, next) => {
  try {
    const { startDate = '', endDate = '' } = request.query;
    
    const statistics = await statisticsService.getStatisticsByDate(startDate, endDate);
    
    return response.status(200).json({
      data: statistics,
    });
  } catch (error) {
    return next(error);
  }
};