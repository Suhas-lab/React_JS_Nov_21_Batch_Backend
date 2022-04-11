import React, { useEffect, useState } from "react";
import { getRequest } from "../api/api";
import { USERLIST_URI } from "../api/baseUrl";
import {Table} from "react-bootstrap";

function UserList() {

    const[userlist, setUserList] = useState([]);

    const fetuserListfromTable = async() =>{

        await getRequest(USERLIST_URI).then(res =>{
            // console.log("User list fetch", res);
            setUserList(res.data)
        }).catch(error =>{
            console.log("Api error in user list")
        })
    }

    useEffect(() =>{
        fetuserListfromTable();
        // const promiseTest = new Promise((resolve, reject) =>{
        //     console.log("Resolve", resolve);
        //     console.log("Reject", reject);
        // });
        // console.log("Promise exe", promiseTest);

        // promiseTest.then(res =>{
        //     console.log("response ", res);
        // }).catch(e =>{console.log("Catch error", e)});

        // const promise1 = Promise.resolve(3);
        // const promise2 = 42;
        // const promise3 = new Promise((resolve, reject) => {
        //     setTimeout(resolve, 100, 'foo');
        // });
        // Promise.all([promise1, promise2, promise3]).then((values) => {
        //     console.log(values);
        // });

    }, []);

    return (
        <>
            <h1>Here is user list</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                {userlist !== null ? 
                    userlist.map(user =>{
                        return(
                            <tr key={user.user_id}>
                                <td>{user.user_id}</td>
                                <td>{user.username_email}</td>
                                <td>{user.password}</td>
                            </tr>
                        )
                    }) : <tr><td colSpan={'3'}>No records found</td></tr>
                }
                </tbody>
            </Table>
        </>
    )
}

export default UserList;