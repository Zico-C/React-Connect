import { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  FormOutlined,
  RobotOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {  Menu  } from 'antd';
// useNavigate 可實現跳轉路徑（路由）
import {  useNavigate , useLocation } from 'react-router-dom';
import { useTranslation  } from "react-i18next";

type MenuItem = Required<MenuProps>['items'][number];

// function getItem(
//   label: React.ReactNode,
//   key: React.Key,
//   icon?: React.ReactNode,
//   children?: MenuItem[],
// ): MenuItem {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   } as MenuItem;
// }

// const items: MenuItem[] = [
//     // getItem('名稱', '路徑' , <icon圖標/>)
//   getItem('欄位 1', '/page1', <PieChartOutlined />),
//   getItem('欄位 2', '/page2', <DesktopOutlined />),
//   getItem('User', 'sub1', <UserOutlined />, [
//     getItem('Tom', '3'),
//     getItem('Bill', '4'),
//     getItem('Alex', '5'),
//   ]),
//   getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
//   getItem('Files', '9', <FileOutlined />),
// ];

//登入請求到數據之後，就可以跟items這個數組進行配對
//Menu直觀的寫法



const Comp: React.FC = () => {
    const { t } = useTranslation();
    const items: MenuItem[] = [
        {
            label:t("MainMenu.Option 1"),
            key: '/page1' ,
            icon:<PieChartOutlined />
        },
        {
            label:t("MainMenu.Option 2"),
            key: '/page2' ,
            icon:<DesktopOutlined />
        },
        {
            label:t("MainMenu.Option 3"),
            key: 'page3' ,
            icon:<UserOutlined />,
            //子菜單的菜單項目 類型為 ItemType[]
            children:[
                {
                    label:t("MainMenu.Option 3_01"),
                    key:'/page3/page3_01'
                },
                {
                    label:t("MainMenu.Option 3_02"),
                    key:'/page3/page3_02'
                },
                {
                    label:t("MainMenu.Option 3_03"),
                    key:'/page3/page3_03'
                }
            ]
        },
        {
            label:t("MainMenu.Option 4"),
            key: 'page4' ,
            icon:<TeamOutlined />,
            children:[
                {
                    label:t("MainMenu.Option 4_01"),
                    key:'/page4/page4_01'
                },
                {
                    label:t("MainMenu.Option 4_02"),
                    key:'/page4/page4_02'
                }
            ]
        },
        {
            label:t("MainMenu.Option 5"),
            key:'page5',
            icon:<FormOutlined />,
            children:[
                {
                    label:t("MainMenu.Option 5_01"),
                    key:'/page5/page5_01'
                },
                {
                    label:t("MainMenu.Option 5_02"),
                    key:'/page5/page5_02'
                },            
                {
                    label:t("MainMenu.Option 5_03"),
                    key:'/page5/page5_03'
                },
            ]
        },
        {
            label:t("MainMenu.Option 6"),
            key: 'page6' ,
            icon:<FileOutlined />
        },
        {
            label:t("MainMenu.Option 7"),
            key:'page7',
            icon:<RobotOutlined />,
            children:[
                {
                    label:t("MainMenu.Option 7_01"),
                    key:'/page7/page7_01'
                },
                {
                    label:t("MainMenu.Option 7_02"),
                    key:'/page7/page7_02'
                },
                {
                    label:t("MainMenu.Option 7_03"),
                    key:'/page7/page7_03'
                },
                {
                    label:t("MainMenu.Option 7_04"),
                    key:'/page7/page7_04'
                },
                {
                    label:t("MainMenu.Option 7_05"),
                    key:'/page7/page7_05'
                },
            ],
        },
        {
            label:t("MainMenu.Option 8"),
            key:'page8',
            icon:<ToolOutlined />,
            children:[
                {
                    label:t("MainMenu.Option 8_01"),
                    key:'/page8/page8_01'
                },
                {
                    label:t("MainMenu.Option 8_02"),
                    key:'/page8/page8_02'
                },
                {
                    label:t("MainMenu.Option 8_03"),
                    key:'/page8/page8_03'
                },
                {
                    label:t("MainMenu.Option 8_04"),
                    key:'/page8/page8_04'
                },
                {
                    label:t("MainMenu.Option 8_05"),
                    key:'/page8/page8_05'
                },
            ],
        },
    ];

    const navigateTo = useNavigate();
    //獲取當前網址路徑
    const currentRoute = useLocation();

    const menuClick = (e:{ key:string }) => {
    //   console.log("點擊菜單" , e.key);
      //點擊後跳轉到對應的路徑 編程式導航跳轉頁面，需要使用Hook
      navigateTo(e.key);
    }
  
    //使用currentRoute.pathname 與 items數組的每一項children的key值進行對比
    //如果找到相等，使用上一層的key，這個key 給予 openKeys數組，作為初始值
    let firstOpenKey:String = "";
    //進行對比
    
    function findKey(obj:{key:string}) {
        return obj.key === currentRoute.pathname;
    }
    //遍歷多個children
    for(let i = 0 ; i < items.length ; i++){
        //如果匹配到對象就是 true, 找不到為false
        if(items[i]!['children'] && items[i]!['children'].length > 0 && items[i]!['children'].find(findKey)){
            firstOpenKey = items[i]!.key as string;
            break;
        }
    }

    //什麼時候執行函數內的代碼？
    //展開和回收事件時執行以下代碼
    //設定展開欄位的初始值
    const [openKeys, setOpenKeys] = useState([firstOpenKey]);
    const handleOpenChange = (keys:string[]) => {
      //keys 是一個數組，記錄當前哪一項展開的(用key來記錄)
  
      //把這個數組修改為最後一項，因為只要一項是展開的，就是最後點擊的那項
      // sub1 sub2 同時點擊時最後點擊會是 su2 = keys[1] 又等於 keys.length(2-1)  
      setOpenKeys([keys[keys.length-1]]);
    }

    return(
        <Menu 
        theme="dark" 
        //defaultSelectedKeys 表示當前樣式所在選中的key
        defaultSelectedKeys={[currentRoute.pathname]} 
        mode="inline" 
        //菜單項數據 
        items={items} 
        onClick={menuClick}
        //某項菜單展開和回收的事件
        onOpenChange={handleOpenChange}
        //當前菜單展開時的key數組
        openKeys = {openKeys}
      />
    )


}

export default Comp;