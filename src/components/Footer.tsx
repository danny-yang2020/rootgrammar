export function Footer() {
  return (
    <div className="flex flex-1 flex-col justify-between bg-gray-100 dark:bg-zinc-900">
      <footer id="contact" className="border-t border-gray-200/50 dark:border-gray-800">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-6">
          <nav>
            <div className="grid grid-cols-3 gap-x-6 gap-y-10">
              <div>
                <h3 className="text-sm font-medium text-gray-400 dark:text-gray-500">产品</h3>
                <ul className="mt-5 space-y-3.5 text-[15px]">
                  {["文档", "学习资源", "博客", "更新日志", "中国大陆版"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 dark:text-gray-500">团队</h3>
                <ul className="mt-5 space-y-3.5 text-[15px]">
                  {["关于我们", "联系我们", "商务合作"].map((item) => (
                    <li key={item}>
                      <button type="button" className="text-left text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 dark:text-gray-500">法律</h3>
                <ul className="mt-5 space-y-3.5 text-[15px]">
                  {["服务条款", "隐私政策", "Cookie 政策"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </footer>
      <footer className="flex h-16 shrink-0 flex-col items-center justify-center space-y-1 text-xs opacity-65">
        <p className="whitespace-nowrap">Copyright © 2023-2026, 句乐部. All rights reserved.</p>
        <div className="flex items-center justify-center space-x-4">
          <a href="#" className="hover:underline">Terms</a>
          <span className="text-gray-300 dark:text-gray-600">·</span>
          <a href="#" className="hover:underline">Privacy</a>
          <span className="text-gray-300 dark:text-gray-600">·</span>
          <a href="#" className="hover:underline">Cookies</a>
        </div>
      </footer>
    </div>
  )
}
