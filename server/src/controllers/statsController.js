const {Item} = require('../models/item')
const {User} = require('../models/user')
const {Category} = require('../models/category')


const getUserStats = async(req, res) => {
    try{
        
    }catch(err){

    }
}

/**

[
  {
    $project: {
      // Extract the year and month from the "createdAt" field (assumed field)
      year: { $year: "$createdAt" },
      month: { $month: "$createdAt" }
    }
  },
  {
    $group: {
      _id: { year: "$year", month: "$month" }, // Group by year and month
      userCount: { $sum: 1 } // Count the number of users in each group
    }
  },
  {
    $group: {
      _id: "$_id.year", // Group by year
      months: {
        $push: {
          month: "$_id.month", // Store the month
          userCount: "$userCount" // Store the count of users for the month
        }
      }
    }
  },
  {
    $sort: { "_id": -1 } // Sort the result by year in ascending order
  }
]
 */

const getAllStats = async(req, res) =>{
    try{
        const UserCount = await User.countDocuments({});
        const UserAggregate = await User.aggregate([
            {
              $project: {
                // Extract the year and month from the "createdAt" field (assumed field)
                year: { $year: "$createdAt" },
                month: { $month: "$createdAt" }
              }
            },
            {
              $group: {
                _id: { year: "$year", month: "$month" }, // Group by year and month
                userCount: { $sum: 1 } // Count the number of users in each group
              }
            },
            {
              $group: {
                _id: "$_id.year", // Group by year
                months: {
                  $push: {
                    month: "$_id.month", // Store the month
                    userCount: "$userCount" // Store the count of users for the month
                  }
                }
              }
            },
            {
              $sort: { "_id": -1 } // Sort the result by year in descending order
            }
          ])

        
        const ItemCount = await Item.countDocuments({});
        const ItemAggregate = await Item.aggregate([
            {
              $project: {
                // Extract the year and month from the "createdAt" field (assumed field)
                year: { $year: "$createdAt" },
                month: { $month: "$createdAt" }
              }
            },
            {
              $group: {
                _id: { year: "$year", month: "$month" }, // Group by year and month
                itemCount: { $sum: 1 } // Count the number of users in each group
              }
            },
            {
              $group: {
                _id: "$_id.year", // Group by year
                months: {
                  $push: {
                    month: "$_id.month", // Store the month
                    itemCount: "$itemCount" // Store the count of users for the month
                  }
                }
              }
            },
            {
              $sort: { "_id": -1 } // Sort the result by year in descending order
            }
          ])
        const CategoryCount = await Category.countDocuments({});
        const CategoryAggregate = await Category.aggregate([
            {
              $project: {
                // Extract the year and month from the "createdAt" field (assumed field)
                year: { $year: "$createdAt" },
                month: { $month: "$createdAt" }
              }
            },
            {
              $group: {
                _id: { year: "$year", month: "$month" }, // Group by year and month
                categoryCount: { $sum: 1 } // Count the number of users in each group
              }
            },
            {
              $group: {
                _id: "$_id.year", // Group by year
                months: {
                  $push: {
                    month: "$_id.month", // Store the month
                    categoryCount: "$categoryCount" // Store the count of users for the month
                  }
                }
              }
            },
            {
              $sort: { "_id": -1 } // Sort the result by year in descending order
            }
          ])
        //console.log(await ItemCount, await UserCount)
        res.status(200).json(
            {data: {
                Users: {TotalUsers: UserCount, UsersCreatedByDate: UserAggregate}, 
                Items: {TotalItems: ItemCount, ItemsCreatedByDate: ItemAggregate},
                Categories: {TotalCategories: CategoryCount, CategoriesCreatedByDate: CategoryAggregate},
            }})
    }catch(err){

    } 
}


module.exports ={
    getUserStats,
    getAllStats
}