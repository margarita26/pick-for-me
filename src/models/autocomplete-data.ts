type AutocompleteBusiness = {
    id: string;
    name: string;
};

type AutocompleteCategories = {
    alias: string;
    title: string;
};

type AutocompleteTerms = {
    text: string;
};

type AutocompleteData = {
    businesses: AutocompleteBusiness[];
    categories: AutocompleteCategories[];
    terms: AutocompleteTerms[];
};
