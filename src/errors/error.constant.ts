export enum NameErrorCacheInformationFlow {
  all = 'all',
  user = 'user',
  phone = 'phone',
  address = 'address',
  term = 'term',
  photo = 'photo',
}

export const NOT_FOUND_CACHE_INFORMATION = (
  nameFlow = NameErrorCacheInformationFlow.all,
) => ({
  code: 1001,
  message: `Not found cache information for save retry flow ${nameFlow}`,
});

export const TERM_NOT_FOUND = {
  code: 1002,
  message: `Term not found`,
};

export const TYPE_USER_NOT_FOUND = {
  code: 1003,
  message: `Type user not found`,
};
