class Node{
    constructor(data, left = null, right = null){
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(root, array = []){
        this.root = root
        this.array = array
    }
    buildTree(array){
        array.sort((a,b) => {
           return a - b
        })
        //Removes Dupes
        let b = 0
        for(let i = 1; i < array.length + 1; i++, b++){
            if(array[b] !== array[i]){
                this.array.push((array[b]))
            }
        }
        let start = 0
        let end = this.array.length - 1;
        let mid = Math.floor((start + end) / 2);
        return this.root = this.balanceTree(start, end, mid)
        
    }
    balanceTree(start, end, mid){
        if(start > end) return null;
        return new Node(
            this.array[mid],
            this.balanceTree(start, mid - 1 , Math.floor((start + mid) / 2)),
            this.balanceTree(mid + 1, end , Math.floor(((mid + 1) + end) / 2))
            );
        
        
    }
    insert(value){
        let tree = this.root
        let prev = null
        while(tree !== null){
            if(tree.data > value){
                prev = tree
                tree = tree.left
            }else if(tree.data < value){
                prev = tree
                tree = tree.right
            }
            if(tree.data === value){
                throw 
            }
            console.log()
            console.log(tree)
        }
        if(prev.data > value){
            prev.left = new Node(value)
        }else {
            prev.right = new Node(value)
        }
        console.log(prev)
        
    }
    delete(value){

    }
   
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  

const tree = new Tree;
tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.insert(13);
console.log(prettyPrint(tree.root))