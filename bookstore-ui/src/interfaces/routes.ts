export default interface IRoute {
    path: string;
    name: string;
    component: any;
    props?: any;
    exact: boolean;
    layout?: string;
    children?: Array<{
        path: string;
        name: string;
        exact: boolean;
        component: any;
        props?: any;
    }>;
}
