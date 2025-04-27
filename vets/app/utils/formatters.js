// utils/formatters.js

/**
 * Capitalizes the first letter of each word in a string
 * @param {string|any} str - The string to format
 * @returns {string} - The formatted string
 */
export const capitalizeWords = (str) => {
   if (!str) return '';
   
   // Ensure input is a string
   const strValue = String(str);
   
   return strValue
     .split(' ')
     .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
     .join(' ');
 };
 
 /**
  * Formats a phone number to (XXX) XXX-XXXX
  * @param {string|number} phoneNumber - The phone number to format
  * @returns {string} - The formatted phone number
  */
 export const formatPhoneNumber = (phoneNumber) => {
   if (!phoneNumber) return '';
   
   // Ensure phoneNumber is a string before using string methods
   const phoneStr = String(phoneNumber);
   
   // Strip all non-numeric characters
   const cleaned = phoneStr.replace(/\D/g, '');
   
   // Check if the input is of correct length
   const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
   
   if (match) {
     return '(' + match[1] + ') ' + match[2] + '-' + match[3];
   }
   
   return phoneStr; // Return original as string if format doesn't match
 };
 
 /**
  * Formats an address with proper capitalization and spacing
  * @param {string|any} address - The address to format
  * @returns {string} - The formatted address
  */
 export const formatAddress = (address) => {
   if (!address) return '';
   
   // Ensure address is a string
   const addressStr = String(address);
   
   // Split address by commas to handle parts separately
   const parts = addressStr.split(',');
   
   // Format each part of the address
   const formattedParts = parts.map(part => {
     // Trim whitespace
     part = part.trim();
     
     // Special handling for state abbreviations and zip codes
     if (part.match(/^[A-Za-z]{2}\s+\d{5}(-\d{4})?$/)) {
       // This is likely a "ST 12345" pattern
       const [state, zip] = part.split(/\s+/);
       return `${state.toUpperCase()} ${zip}`;
     }
     
     // For street address parts, capitalize each word
     return capitalizeWords(part);
   });
   
   // Join back with commas and spaces
   return formattedParts.join(', ');
 };
 
 /**
  * Formats contact preference with proper capitalization
  * @param {string|any} pref - The contact preference
  * @returns {string} - The formatted contact preference
  */
 export const formatContactPreference = (pref) => {
   if (!pref) return '';
   
   // Ensure pref is a string
   const prefStr = String(pref);
   
   // Handle common contact preferences
   const lowerPref = prefStr.toLowerCase();
   
   if (lowerPref === 'email') return 'Email';
   if (lowerPref === 'phone' || lowerPref === 'telephone') return 'Phone';
   if (lowerPref === 'sms' || lowerPref === 'text') return 'SMS';
   
   // Default to capitalize first letter
   return prefStr.charAt(0).toUpperCase() + prefStr.slice(1).toLowerCase();
 };
 
 /**
  * Formats sex/gender with proper capitalization
  * @param {string|any} sex - The sex/gender value
  * @returns {string} - The formatted value
  */
 export const formatSex = (sex) => {
   if (!sex) return '';
   
   // Ensure sex is a string
   const sexStr = String(sex);
   
   const lowerSex = sexStr.toLowerCase();
   
   if (lowerSex === 'male' || lowerSex === 'm') return 'Male';
   if (lowerSex === 'female' || lowerSex === 'f') return 'Female';
   if (lowerSex === 'non-binary' || lowerSex === 'nonbinary') return 'Non-binary';
   if (lowerSex === 'other') return 'Other';
   
   // For any other value, just capitalize first letter
   return sexStr.charAt(0).toUpperCase() + sexStr.slice(1).toLowerCase();
 };
 
 /**
  * Formats a date in a consistent way
  * @param {string|Date|any} date - The date to format
  * @returns {string} - The formatted date
  */
 export const formatDate = (date) => {
   if (!date) return '';
   
   try {
     // Convert to Date object and format
     return new Date(date).toLocaleDateString("en-US", {
       year: "numeric",
       month: "long",
       day: "numeric",
     });
   } catch (e) {
     // If parsing fails, ensure we return a string
     return String(date);
   }
 };