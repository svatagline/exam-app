import { toast } from "react-toastify";

export const logOut = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
};

export const ToastMessage = (msg, type) => {
    if (`${msg}`.includes(`jwt expired`)) {
        setTimeout(() => {
            logOut()
        }, 2000)

    }
    switch (type) {
        case 's':
            toast.success(msg);
            break;
        case 'w':
            toast.warning(msg);
            break;
        case 'e':
            toast.error(msg);
            break;
        default:
            toast.warning(msg);
            break;
    }
}

export const ManageError = (err) => {
    console.log(err)
    if (err?.response?.data?.message) {
        ToastMessage(err?.response?.data?.message, 'e')
    } else if (err?.response?.message) {
        ToastMessage(err?.response?.message, 'e')
    } else if (err?.message) {
        ToastMessage(err?.message, 'e')
    } else if (err) {
        ToastMessage(err, 'e')
    }
}
export const userData = () => {
    let user = localStorage.getItem('user');
    try {
        return JSON.parse(user);
    } catch (error) {
        console.log(error);
        return {};
    }
};

export const getUserInfo = (field = 'role') => {
    const user = userData();
    return user && user[field];
};

export function findDuplicateIndices(arr) {
    const duplicateIndices = {};
  
    // Iterate through the array
    arr.forEach((value, index) => {
      // Check if the value is already a key in the object
      if (duplicateIndices[value]) {
        duplicateIndices[value].push(index); // Add the index to the array
      } else {
        duplicateIndices[value] = [index]; // Initialize a new array with the current index
      }
    });
  
    // Filter out values that only occur once
    for (const key in duplicateIndices) {
      if (duplicateIndices[key].length <= 1) {
        delete duplicateIndices[key];
      }
    }
  
    // If no duplicates found, return false
    if (Object.keys(duplicateIndices).length === 0) {
      return false;
    }
  
    // Construct error message for duplicates
    const errorMessages = Object.entries(duplicateIndices).map(
      ([value, indices]) => {
        const questionNumbers = indices.join(", ");
        return `question ${questionNumbers} are similar`;
      }
    );
  
    return new Error(errorMessages.join(", "));
  }
  
 export   const setUpdate = (fun) =>{
    setTimeout(() => {
      fun()
    }, 500);
 }
  
 export const isBlankSpace =  (value) =>{
  const isBlank = /^\s*$/.test(value || '');
  if (isBlank) {
    return false;
  }
  return true;
}

export const trim = (value) => {
  return `${value}`.trim();
}