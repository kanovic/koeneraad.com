export default {
  widgets: [
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '6004171ee91328ceb882c038',
                  title: 'Sanity Studio',
                  name: 'koeneraad-com-studio',
                  apiId: '2ed119f8-f9e9-487b-ade2-9cb3ce5f11c2'
                },
                {
                  buildHookId: '6004171e2191b4d54dbaefa1',
                  title: 'Blog Website',
                  name: 'koeneraad-com',
                  apiId: '69317baa-41a6-4536-8869-b3585ea05ce4'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/kanovic/koeneraad.com',
            category: 'Code'
          },
          { title: 'Frontend', value: 'https://koeneraad-com.netlify.app', category: 'apps' }
        ]
      }
    },
    { name: 'project-users', layout: { height: 'auto' } },
    {
      name: 'document-list',
      options: { title: 'Recent blog posts', order: '_createdAt desc', types: ['post'] },
      layout: { width: 'medium' }
    }
  ]
}
