# 🚀 Vercel Deployment Guide

This guide will help you deploy your Food Delivery application to Vercel.

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Vercel CLI**: Install globally with `npm i -g vercel`
3. **MongoDB Atlas**: Set up a cloud MongoDB database
4. **Environment Variables**: Prepare your production environment variables

## 🗄️ Database Setup (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create a database user
4. Get your connection string
5. Whitelist your IP addresses (or use 0.0.0.0/0 for all IPs)

## 🔧 Environment Variables

### Backend Environment Variables (Vercel Dashboard)

Add these in your Vercel project settings:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fooddelivery?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=production
PORT=3001
```

### Frontend Environment Variables (Vercel Dashboard)

```env
NEXT_PUBLIC_API_URL=https://your-backend-app.vercel.app
```

## 🚀 Deployment Steps

### Step 1: Deploy Backend

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy backend**:
   ```bash
   vercel --prod
   ```

4. **Set environment variables** in Vercel dashboard:
   - Go to your project settings
   - Add the backend environment variables listed above

5. **Note the backend URL** (e.g., `https://your-backend-app.vercel.app`)

### Step 2: Deploy Frontend

1. **Navigate to frontend directory**:
   ```bash
   cd ../frontend
   ```

2. **Deploy frontend**:
   ```bash
   vercel --prod
   ```

3. **Set environment variables** in Vercel dashboard:
   - Add `NEXT_PUBLIC_API_URL` with your backend URL

### Step 3: Update API URLs

After deployment, update any hardcoded localhost URLs in your code:

1. **Check for hardcoded URLs**:
   ```bash
   grep -r "localhost" frontend/src/
   ```

2. **Update any found URLs** to use environment variables

## 🔍 Post-Deployment Checklist

- [ ] Backend API is accessible
- [ ] Frontend loads without errors
- [ ] Authentication works
- [ ] Database connection is established
- [ ] All API endpoints respond correctly
- [ ] Images load properly
- [ ] Admin panel functions correctly

## 🛠️ Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure your backend allows your frontend domain
2. **Environment Variables**: Double-check all variables are set correctly
3. **Database Connection**: Verify MongoDB Atlas connection string
4. **Build Errors**: Check for TypeScript errors before deployment

### Debug Commands:

```bash
# Check build locally
npm run build

# Test production build
npm run start

# Check environment variables
vercel env ls
```

## 📱 Custom Domain (Optional)

1. Go to Vercel dashboard
2. Select your project
3. Go to Settings > Domains
4. Add your custom domain
5. Update DNS records as instructed

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to your main branch. Make sure to:

1. Connect your GitHub repository
2. Set up automatic deployments
3. Configure branch protection rules

## 📊 Monitoring

- Use Vercel Analytics for performance monitoring
- Set up error tracking with Sentry (optional)
- Monitor API response times
- Check database performance

## 🎉 Success!

Your Food Delivery app should now be live on Vercel! 

- **Frontend**: `https://your-frontend-app.vercel.app`
- **Backend**: `https://your-backend-app.vercel.app`

Remember to test all functionality in the production environment!