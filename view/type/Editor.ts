export interface Editor {
    childs: Editor[];
    type: number;
    name: string;
    tagName: string;
    data: string;
    text: string;
    cursor_offset: string;
    cursor_type: string;
    cursor_index: string;
    cursor_scroll_x: string;
    cursor_scroll_y: string;
}
