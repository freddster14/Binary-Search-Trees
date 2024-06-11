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
        if(this.root.data === value || value === undefined) return
        let tree = this.root
        let lastNode = null
        while(tree !== null && tree.data !== value){
            if(tree.data > value){
                lastNode = tree
                tree = tree.left
            }else if(tree.data < value){
                lastNode = tree
                tree = tree.right
            }
        }
        //Adds new 'Leaf'
        if(lastNode.data > value && tree === null){
            lastNode.left = new Node(value)
        }else if(lastNode.data < value && tree === null){
            lastNode.right = new Node(value)
        }
    }
    delete(value){
        if(value === undefined) return
        let tree = this.root;
        let lastNode = null;
        while(tree !== null && tree.data !== value){
            if(tree.data > value){
                lastNode = tree
                tree = tree.left
            }else if(tree.data < value){
                lastNode = tree
                tree = tree.right
            }
        }
        if(tree === null)return
        if(tree.left === null && tree.right === null){
            if(lastNode.data < tree.data) return lastNode.right = null
            return lastNode.left = null
        }else if(tree.left !== null && tree.right === null){
            if(lastNode.left === tree) return lastNode.left = tree.left;
            return lastNode.right = tree.left
        }else if(tree.right !== null && tree.left === null){
            if(lastNode.left === tree) return lastNode.left = tree.right;
            return lastNode.right = tree.right
        }else if(tree.left !== null && tree.right !== null){
            let successor = tree.right;
            lastNode = successor
            while(successor.left !== null){
                lastNode = successor
                successor = successor.left
            }
            if(lastNode.left === null) tree.right = null
            lastNode.left = successor.right
            tree.data = successor.data
        }
    }
    find(value){
        if(value === undefined) return
        let tree = this.root
        while(tree !== null && tree.data !== value){
            if(tree.data > value){
                tree = tree.left
            }else if(tree.data < value){
                tree = tree.right
            }
        }
        return tree
    }
    levelOrder(callback){
       
        let array = [];
        array.push(this.root)
        while(array.length !== 0){

        }

        
        if(callback === null) return array
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
  

const numTree = new Tree;
numTree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
numTree.insert(6);
numTree.insert(70);
numTree.insert(69);
numTree.insert(68);
numTree.insert(68.5)
numTree.insert(71);

//numTree.delete(4);
numTree.delete(67);
numTree.delete()
console.log(prettyPrint(numTree.root))
console.log(numTree.find(9))
