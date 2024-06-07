class Node{
    constructor(data, left = null, right = null){
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(root){
        this.root = root
    }
    buildTree(array){
        array.sort((a,b) => {
           return a - b
        })

    }
}


const tree = new Tree;
tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);