interface Item {
    id: string | number;
    content: string;
  }
  
  interface BlogPost extends Item {
    title: string;
  }
  