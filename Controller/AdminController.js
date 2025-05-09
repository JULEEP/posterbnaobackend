import User from "../Models/User.js";
import PrivacyPolicy from "../Models/privacyPolicyModel.js";
import AboutUs from "../Models/Aboutus.js";
import ContactMessage from "../Models/ContactMessage.js";
import Order from '../Models/Order.js'

// User Controller (GET All Users)
export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users
  
      if (users.length === 0) {
        return res.status(404).json({ message: 'No users found!' });
      }
  
      // Map and format each user's data
      const formattedUsers = users.map(user => ({
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        profileImage: user.profileImage || 'default-profile-image.jpg',
      }));
  
      return res.status(200).json({
        message: 'Users retrieved successfully!',
        users: formattedUsers,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };


// Controller to get all users who have subscribed to at least one plan
export const getAllUsersWithSubscribedPlans = async (req, res) => {
  try {
    const users = await User.find(
      { subscribedPlans: { $exists: true, $not: { $size: 0 } } },  // Ensure users have at least one plan
      'name email mobile subscribedPlans'  // Only select the required fields
    )
    .populate('subscribedPlans.planId', 'name originalPrice offerPrice discountPercentage duration startDate endDate'); // Populate plan details

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users with subscribed plans found' });
    }

    // Map the users to return the desired structure
    const formattedUsers = users.map(user => {
      return {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        subscribedPlans: user.subscribedPlans.map(plan => ({
          planId: plan.planId._id,
          name: plan.planId.name,
          originalPrice: plan.planId.originalPrice,
          offerPrice: plan.planId.offerPrice,
          discountPercentage: plan.planId.discountPercentage,
          duration: plan.planId.duration,
          startDate: plan.startDate,
          endDate: plan.endDate,
        })),
      };
    });

    res.status(200).json({
      message: 'Users with subscribed plans fetched successfully',
      users: formattedUsers,
    });
  } catch (error) {
    console.error('Error fetching users with subscribed plans:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// Create or update the privacy policy
export const createOrUpdatePrivacyPolicy = async (req, res) => {
  const { title, content, date } = req.body;

  try {
    // Check if the policy exists, if so, update it, otherwise create a new one
    const existingPolicy = await PrivacyPolicy.findOne();
    if (existingPolicy) {
      existingPolicy.title = title;
      existingPolicy.content = content;
      existingPolicy.date = date;
      await existingPolicy.save();
      return res.status(200).json({ message: "Privacy policy updated successfully!" });
    } else {
      const newPolicy = new PrivacyPolicy({
        title,
        content,
        date,
      });
      await newPolicy.save();
      return res.status(201).json({ message: "Privacy policy created successfully!" });
    }
  } catch (error) {
    console.error("Error creating/updating privacy policy:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Get the current privacy policy
export const getPrivacyPolicy = async (req, res) => {
  try {
    const policy = await PrivacyPolicy.findOne();
    if (!policy) {
      return res.status(404).json({ message: "Privacy policy not found." });
    }
    return res.status(200).json(policy);
  } catch (error) {
    console.error("Error fetching privacy policy:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};



// Create or Update About Us
export const createOrUpdateAboutUs = async (req, res) => {
  const { title, content, date } = req.body;

  try {
    const existingAbout = await AboutUs.findOne();

    if (existingAbout) {
      existingAbout.title = title;
      existingAbout.content = content;
      existingAbout.date = date;
      await existingAbout.save();
      return res.status(200).json({ message: 'About Us updated successfully!' });
    } else {
      const newAbout = new AboutUs({ title, content, date });
      await newAbout.save();
      return res.status(201).json({ message: 'About Us created successfully!' });
    }
  } catch (error) {
    console.error('Error in createOrUpdateAboutUs:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Get About Us
export const getAboutUs = async (req, res) => {
  try {
    const aboutData = await AboutUs.findOne();
    if (!aboutData) {
      return res.status(404).json({ message: 'About Us not found' });
    }
    res.status(200).json(aboutData);
  } catch (error) {
    console.error('Error fetching About Us:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};



export const submitContactMessage = async (req, res) => {
  const { name, email, subject, message, address } = req.body;

  try {
    const newMessage = new ContactMessage({
      name,
      email,
      subject,
      message,
      address  // ➕ Save address

    });

    await newMessage.save();
    res.status(201).json({ message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Error submitting contact message:', error);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
};


// GET: Retrieve All Contact Messages
export const getAllContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ message: 'Failed to retrieve contact messages.' });
  }
};



export const getDashboardData = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    // 1. Active Users (who have at least one order in last 24 hours)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const activeUsers = await User.find({
      updatedAt: { $gte: yesterday }
    });

    // 2. Today's Orders
    const todaysOrders = await Order.find({
      orderDate: { $gte: startOfDay, $lte: endOfDay }
    }).populate('user poster businessPoster');

    // 3. This Week's Earnings
    const startOfWeek = new Date();
    startOfWeek.setDate(today.getDate() - today.getDay()); // Start of this week (Sunday)
    const earnings = await Order.aggregate([
      {
        $match: {
          orderDate: { $gte: startOfWeek },
          status: 'Completed'
        }
      },
      {
        $group: {
          _id: { $dayOfWeek: "$orderDate" },
          totalAmount: { $sum: "$totalAmount" }
        }
      },
      {
        $sort: { _id: 1 } // Sorting the results by the day of the week
      }
    ]);
    const weeklyEarnings = earnings.map(e => ({
      day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][e._id - 1],
      amount: e.totalAmount
    }));

    // 4. Completed Orders Count This Week
    const completedOrdersThisWeek = await Order.aggregate([
      {
        $match: {
          orderDate: { $gte: startOfWeek },
          status: 'Completed'
        }
      },
      {
        $group: {
          _id: { $dayOfWeek: "$orderDate" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 } // Sorting by the day of the week
      }
    ]);
    const weeklyCompletedOrders = completedOrdersThisWeek.map(order => ({
      day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][order._id - 1],
      count: order.count
    }));

    // 5. Completed Orders Count
    const completedOrdersCount = await Order.countDocuments({ status: 'Completed' });

    // 6. Today's Birthdays
    const todayStr = new Date().toISOString().slice(5, 10); // 'MM-DD'
    const birthdayUsers = await User.find({
      dob: { $regex: todayStr } // Assuming dob stored as string like '1997-05-08'
    });

    // 7. Today's Anniversaries
    const anniversaryUsers = await User.find({
      marriageAnniversaryDate: { $regex: todayStr }
    });

    // 8. Subscribed Plans Summary (from users)
    const users = await User.find({ 'subscribedPlans.0': { $exists: true } });
    const plans = users.flatMap(user => user.subscribedPlans.map(p => p.name));
    const planSummary = {};
    plans.forEach(p => {
      planSummary[p] = (planSummary[p] || 0) + 1;
    });

    return res.status(200).json({
      activeUsersCount: activeUsers.length,
      todaysOrders,
      totalEarnings: weeklyEarnings.reduce((sum, day) => sum + day.amount, 0),
      completedOrdersCount,
      birthdayUsers,
      anniversaryUsers,
      planSummary,
      weeklyEarnings, // Return weekly earnings data
      weeklyCompletedOrders, // Return weekly completed orders data
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Dashboard fetch failed' });
  }
};

  