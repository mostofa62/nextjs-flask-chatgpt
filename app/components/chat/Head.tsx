const Logo = (props:any) => {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <path
        d="M21.489 0.000137437C16.2361 0.000137437 11.5693 3.38105 9.94257 8.37121C8.27321 8.71517 6.69629 9.41057 5.31673 10.4111C3.93718 11.4117 2.78665 12.6944 1.94169 14.1741C-0.692807 18.7253 -0.0912288 24.447 3.43815 28.348C2.34851 31.6154 2.72248 35.191 4.46268 38.1498C7.08104 42.7172 12.3495 45.0579 17.505 43.9687C18.6337 45.2421 20.0211 46.2603 21.5747 46.9554C23.1282 47.6505 24.8122 48.0066 26.5142 47.9999C31.7671 47.9999 36.4339 44.619 38.0606 39.6288C41.4431 38.9296 44.3541 36.8164 46.0454 33.826C48.696 29.2747 48.0944 23.5531 44.5656 19.6521V19.6359C45.1039 18.0209 45.291 16.3095 45.1143 14.6164C44.9376 12.9232 44.4012 11.2873 43.5411 9.81804C40.9222 5.26676 35.6532 2.92546 30.5144 4.01461C29.3804 2.74456 27.9893 1.72987 26.4333 1.03778C24.8774 0.345687 23.192 -0.00800442 21.489 0.000137437ZM21.489 3.12129L21.4728 3.13742C23.587 3.13742 25.6199 3.86889 27.246 5.21838C27.1809 5.25063 27.0507 5.33185 26.9533 5.3808L17.3914 10.8911C16.9034 11.1675 16.6106 11.6876 16.6106 12.2567V25.1951L12.4964 22.8222V12.1265C12.4955 9.74073 13.4421 7.45216 15.1282 5.76354C16.8143 4.07493 19.1021 3.12496 21.489 3.12129ZM33.0077 6.8881C34.5923 6.88506 36.1496 7.3002 37.5222 8.09158C38.8948 8.88295 40.034 10.0225 40.8248 11.395C41.8654 13.2157 42.2555 15.345 41.8977 17.4093C41.8326 17.3603 41.7029 17.2958 41.6211 17.2468L32.0592 11.7199C31.8187 11.5839 31.547 11.5124 31.2707 11.5124C30.9943 11.5124 30.7227 11.5839 30.4821 11.7199L19.2774 18.1891V13.4426L28.5304 8.09475C29.8909 7.30635 31.4351 6.88998 33.0077 6.88753V6.8881ZM9.35771 11.8011V23.1631C9.35771 23.7322 9.65043 24.2362 10.1385 24.5288L21.3265 30.9819L17.1955 33.371L7.95863 28.0393C5.8944 26.8435 4.38918 24.8779 3.77339 22.5739C3.1576 20.27 3.48156 17.8159 4.67415 15.7505C5.7262 13.9277 7.3831 12.5309 9.35771 11.8011ZM30.791 14.6129L40.044 19.9447C44.3536 22.4317 45.8166 27.9258 43.3285 32.2334L43.3446 32.2496C42.2878 34.0702 40.6289 35.4681 38.661 36.1834V24.8208C38.661 24.2517 38.3683 23.7316 37.8803 23.4557L26.6761 16.9859L30.791 14.6129ZM23.9932 18.5307L28.7096 21.2613V26.7065L23.9932 29.4371L19.2774 26.7065V21.2613L23.9932 18.5307ZM31.4087 22.8222L35.5229 25.1951V35.8747C35.5229 40.8487 31.4899 44.8799 26.5304 44.8799V44.8638C24.4323 44.8638 22.3833 44.1323 20.7733 42.7834C20.8384 42.7511 20.9848 42.6694 21.066 42.6204L30.6279 37.1101C31.116 36.8337 31.4248 36.3136 31.4081 35.7445L31.4087 22.8222ZM28.7252 29.8115V34.5575L19.4722 39.8892C15.1626 42.3601 9.66599 40.8971 7.17785 36.6056H7.19398C6.13719 34.8011 5.76264 32.6556 6.12048 30.5914C6.18559 30.6403 6.31582 30.7048 6.39706 30.7538L15.9589 36.2807C16.1995 36.4167 16.4711 36.4882 16.7475 36.4882C17.0239 36.4882 17.2955 36.4167 17.5361 36.2807L28.7252 29.8115Z"
        fill="#f1e56c"
      />
    </svg>
  );
};

export default function Head() {
  return (
    <div className="flex items-center">
      <div className="bg-[#FF6600] flex items-center justify-center p-4 rounded-2xl">
        <Logo className="w-8 h-8" />
      </div>
      <span className="text-white ml-4 text-lg">EdCoach AI</span>
    </div>
  );
}
