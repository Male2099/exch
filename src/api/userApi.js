// // const API_BASE_URL=import.meta.env.API_BASE_URL;
// const API_BASE_URL="http://localhost:8081/api/v1";

// export default {
//     async createUser(data) {
//       console.log(API_BASE_URL);
//         try {
//           const res = await fetch(`${API_BASE_URL}/auth/register`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//           });
    
//           console.log(await res.json());
//           // if (!res.ok) {
//           //   throw new Error('Failed to create user');
//           // }
    
//           console.log(234);
//         } catch (error) {
//           // Handle the error here
//           console.error(error);
//         }
//       },
// }