from app.utils.consts import CATEGORIES

def get_subcategories_for_category(category: str) -> list[str]:
    """
    Return immediate subcategories for `category` from FIXED_STRUCTURE.
    Raises ValueError if category not found.
    """
    def find_node(tree: dict, target: str) -> dict | None:
        if target in tree:
            return tree[target]
        for key, subtree in tree.items():
            if isinstance(subtree, dict):
                result = find_node(subtree, target)
                if result is not None:
                    return result
        return None

    node = find_node(CATEGORIES, category)
    if node is None:
        raise ValueError(f"Category '{category}' not found")

    return list(node.keys())


