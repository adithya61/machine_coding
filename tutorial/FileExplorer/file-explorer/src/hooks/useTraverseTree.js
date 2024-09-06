const useTraverseTree = () => {
  const insertNode = (tree, id, item, isFolder) => {
    if (tree.id == id && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder: isFolder,
        items: [],
      });

      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((obj) => {
      return insertNode(obj, id, item, isFolder);
    });

    return { ...tree, items: latestNode };
  };

  return { insertNode };
};

export default useTraverseTree;
