# Npm Coupon Csv Import
- This script uses environment variable to keep secret. 
- The /src directory will be ignore in the commit. This directory is for keeping all coupons data (both .csv and .json).
- Please Note: the node script depends on CLI's command of NODE_ENV=${value}. you will probably not able to run it on window OS.  

```
.  
+-- package.json.  
+-- script.  
|   +-- main.ts.  
|   +-- constants.ts.        
|   +-- authentication.ts.   
|   +-- script.ts. 
+-- src. 
|   +-- production. 
|   |   +-- data.csv. 
|   |   +-- output.json. 
|   +-- staging. 
|   |   +-- data.csv. 
|   |   +-- output.json. 
|   .env.default // dummy environment
.  

```
