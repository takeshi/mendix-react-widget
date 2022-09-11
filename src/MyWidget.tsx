import React,{ FC, createElement, ReactNode ,useState, useEffect} from "react";

import { MyWidgetContainerProps } from "../typings/MyWidgetProps";
// import { BadgeSample } from "./components/BadgeSample";
import "./ui/MyWidget.css";


export const MyWidget: React.FC = () => {
    // const [name, setName] = useState('');
            const [posts, setPosts] = useState([])

        useEffect(() => {
            fetch('/rest/ticketservice/v1/ticket', {method: 'GET',headers:{"accept":"application/json"}})
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setPosts(data)
            })
        },[])

    return (
            <div>
                <div>MyWidget:Task JSON</div>
                <ul>
                 {
                    posts.map(post => 
                    <li key={(post as any).title}>{(post as any).title}</li>
                )
                }

                </ul>

            </div>
    );
};
// export class MyWidget extends Component<MyWidgetContainerProps> {

//     render(): ReactNode {
//         const [posts, setPosts] = useState([])

//         // useEffect(() => {
//         //     fetch('/rest/ticketservice/v1/ticket', {method: 'GET'})
//         //     .then(res => res.json())
//         //     .then(data => {
//         //         setPosts(data)
//         //     })
//         // },[])
    

//         return (
//             <div>
//                 <div>hello</div>
//                 {/* {
//                     posts.map(post => 
//                     <li>{post}</li>
//                     )
//                 } */}

//             </div>

//         );
//     }

// }
